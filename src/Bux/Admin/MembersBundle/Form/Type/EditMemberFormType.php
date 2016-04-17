<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/12/15
 * Time: 3:08 PM
 */

namespace Bux\Admin\MembersBundle\Form\Type;

use Bux\Admin\MembersBundle\Form\DataTransformer\UserToStringTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class EditMemberFormType
 *
 * @package Bux\Admin\MembersBundle\Form\Type
 */
class EditMemberFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // this assumes that the entity manager was passed in as an option
        $entityManager = $options['em'];
        $transformer = new UserToStringTransformer($entityManager);

        $builder
            ->add('username', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('fullName', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('email', 'email', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('plain_password', 'password', array(
                'required'  => false
            ))
            ->add('country', 'country', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('membership', 'entity', array(
                'class'     => 'BuxUserBundle:Membership',
                'property'  => 'name',
                'constraints'   => array(
                    new NotBlank()
                )
            ))
//            ->add('sponsor', 'text', array(
////                'data_class'    => 'Bux\UserBundle\Entity\User',
//                'required'  => false,
//            ))
            ->add('wallet', new WalletFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('purchaseWallet', new PurchaseWalletFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('surveyWalletBalance', new SurveyWalletFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('surveyWalletAvailableBalance', new SurveyWalletAvailableFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
//        $builder
//            ->add('sponsor', 'text', array(
//                'data_class'    => null,
//                'required'  => false,
//            ))->addModelTransformer($transformer);
        $builder->add(
            $builder->create('sponsor', 'text', array(
                'required' => false
            ))->addModelTransformer($transformer)
        );
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\UserBundle\Entity\User',
        ))
        ->setRequired(array(
            'em',
        ))
        ->setAllowedTypes(array(
            'em' => 'Doctrine\Common\Persistence\ObjectManager',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'edit_member_form_type';
    }
}