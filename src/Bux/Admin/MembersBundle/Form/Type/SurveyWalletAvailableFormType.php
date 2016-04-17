<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/4/15
 * Time: 1:07 PM
 */

namespace Bux\Admin\MembersBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class SurveyWalletAvailableFormType
 *
 * @package Bux\Admin\MembersBundle\Form\Type
 */
class SurveyWalletAvailableFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('sum', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\WalletBundle\Entity\SurveyWalletAvailableBalance',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'survey_available_wallet_form_type';
    }
}