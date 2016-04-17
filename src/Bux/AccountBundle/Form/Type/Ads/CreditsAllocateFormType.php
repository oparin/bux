<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/19/15
 * Time: 3:31 PM
 */

namespace Bux\AccountBundle\Form\Type\Ads;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class CreditsAllocateFormType
 * @package Bux\AccountBundle\Form\Type\Ads
 */
class CreditsAllocateFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('credits', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

//    /**
//     * @param OptionsResolverInterface $resolver
//     */
//    public function setDefaultOptions(OptionsResolverInterface $resolver)
//    {
//        $resolver->setDefaults(array(
//            'data_class' => 'Bux\AdvertiseBundle\Entity\VideoAd',
//        ));
//    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'credits_allocate_form_type';
    }
}