<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 1:18 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Video;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class CategoriesFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Video
 */
class CategoriesFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('value', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ))
            ->add('credits', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('time', 'integer', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('refEarning', 'checkbox', array(
                'required'  => false,
                'label' => '(Member will earn per referral click in this category)'
            ))
            ->add('hideDescription', 'checkbox', array(
                'required'  => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\AdvertisementsBundle\Entity\VideoCategories',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'categories_form_type';
    }
}